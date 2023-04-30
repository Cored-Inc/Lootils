type Page = {
	name: string;
	href: string;
};

const Pages: Page[] = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "About",
		href: "/about",
	},
	{
		name: "Notes",
		href: "/notes",
	},
	{
		name: "Todos",
		href: "todos",
	},
];

export { Pages };
