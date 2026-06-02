import { GH_DATA as FALLBACK_DATA } from './data';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

const QUERY = `
  query($userName:String!, $searchQuery:String!) {
    search(query: $searchQuery, type: ISSUE) {
      issueCount
    }
    user(login: $userName){
      repositories(privacy: PUBLIC, isFork: false) {
        totalCount
      }
      organizations {
        totalCount
      }
      issues(states: CLOSED) {
        totalCount
      }
      pullRequests {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

function mapContributionLevel(level: string): number {
  switch (level) {
    case 'NONE': return 0;
    case 'FIRST_QUARTILE': return 1;
    case 'SECOND_QUARTILE': return 2;
    case 'THIRD_QUARTILE': return 3;
    case 'FOURTH_QUARTILE': return 4;
    default: return 0;
  }
}

export interface GithubDataResponse {
  grid: number[][];
  totalContributions: number;
  repos: number;
  orgs: number;
  prs: number;
  issues: number;
}

export async function fetchGithubData(): Promise<GithubDataResponse> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'isheraz';
  
  const fallbackResponse = { 
    grid: FALLBACK_DATA, 
    totalContributions: 3238,
    repos: 59,
    orgs: 7,
    prs: 1200,
    issues: 312
  };

  if (!token) {
    console.log('[lib/github] No GITHUB_TOKEN found, falling back');
    return fallbackResponse;
  }

  try {
    console.log(`[lib/github] Fetching GraphQL for username: ${username}...`);
    const searchQuery = `reviewed-by:${username}`;
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { userName: username, searchQuery }
      }),
      // Cache for 24h only if we have a real token
      next: { revalidate: token ? 86400 : 0 }
    });

    console.log(`[lib/github] GraphQL response status: ${response.status}`);
    if (!response.ok) {
      console.error('GitHub API error', await response.text());
      return fallbackResponse;
    }

    const { data, errors } = await response.json();
    if (errors) {
      console.error('GitHub GraphQL errors:', errors);
      return fallbackResponse;
    }

    const totalContributions = data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || fallbackResponse.totalContributions;
    const repos = data?.user?.repositories?.totalCount || fallbackResponse.repos;
    const orgs = data?.user?.organizations?.totalCount || fallbackResponse.orgs;
    const issues = data?.user?.issues?.totalCount || fallbackResponse.issues;
    // Use the search query result for PRs reviewed!
    const prs = data?.search?.issueCount || data?.user?.pullRequests?.totalCount || fallbackResponse.prs;

    const weeks = data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    const formattedData: number[][] = [];

    for (const week of weeks) {
      const weekData = [0, 0, 0, 0, 0, 0, 0];
      const days = week.contributionDays || [];
      
      for (const day of days) {
        if (day.weekday >= 0 && day.weekday <= 6) {
          weekData[day.weekday] = mapContributionLevel(day.contributionLevel);
        }
      }
      formattedData.push(weekData);
    }
    
    // We want exactly 53 weeks to match the fallback grid, pad if necessary
    while (formattedData.length < 53) {
      formattedData.unshift([0, 0, 0, 0, 0, 0, 0]);
    }
    // Limit to 53 weeks just in case
    if (formattedData.length > 53) {
      return { grid: formattedData.slice(-53), totalContributions, repos, orgs, issues, prs };
    }
    
    return { grid: formattedData, totalContributions, repos, orgs, issues, prs };
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    return fallbackResponse;
  }
}
