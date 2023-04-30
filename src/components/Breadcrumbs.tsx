import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalize } from "~/utils/functions";

const Breadcrumbs: React.FC = () => {
	const router = useRouter();
	const { asPath } = router;

	// Split the pathname into an array of segments
	const segments = asPath.split("/").filter((segment) => segment !== "");

	// Generate the breadcrumb links
	const breadcrumbs = segments.map((segment, index) => {
		const href = `/${segments.slice(0, index + 1).join("/")}`;
		const isLast = index === segments.length - 1;

		return (
			<li key={segment}>
				{isLast ? (
					<span>{capitalize(segment)}</span>
				) : (
					<Link href={href}>{capitalize(segment)}</Link>
				)}
			</li>
		);
	});

	return <>{breadcrumbs}</>;
};

export default Breadcrumbs;
