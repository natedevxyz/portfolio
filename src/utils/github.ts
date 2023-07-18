import { graphql } from '@octokit/graphql';

let to = new Date();
let year = to.getFullYear();
let month = to.getMonth();
let day = to.getDate();
let from = new Date(year - 1, month, day - 1);

interface ContributionCalendar {
	totalContributions: number;
}

interface ContributionsCollection {
	contributionCalendar: ContributionCalendar;
}

interface User {
	contributionsCollection: ContributionsCollection;
}

interface QueryResult {
	user: User;
}

const result: QueryResult = await graphql(
	`
		query ContributionsView(
			$username: String!
			$from: DateTime!
			$to: DateTime!
		) {
			user(login: $username) {
				contributionsCollection(from: $from, to: $to) {
					contributionCalendar {
						totalContributions
					}
				}
			}
		}
	`,
	{
		username: 'natedevxyz',
		from: from,
		to: to,
		headers: {
			authorization: `bearer ${import.meta.env.GH_TOKEN}`,
		},
	}
);

const data =
	result.user.contributionsCollection.contributionCalendar.totalContributions;

export { data };
