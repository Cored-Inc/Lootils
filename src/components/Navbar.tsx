import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaBars, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Pages } from "~/utils/project";

const Navbar: React.FC = () => {
	const { status } = useSession();

	return (
		<div className="navbar bg-base-200 rounded-lg mb-5">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<FaBars className="w-5 h-5" />
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
					>
						{Pages.map((p) => (
							<li key={p.name}>
								<Link href={p.href} className="btn-base-300 text-secondary">
									{p.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<Link
					href="/"
					className="btn btn-ghost normal-case text-xl text-primary"
				>
					Lootils
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					{Pages.map((p) => (
						<li key={p.name}>
							<Link href={p.href} className="btn-base-300 text-secondary">
								{p.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="navbar-end">
				{status === "unauthenticated" ? (
					<button
						onClick={() => void signIn()}
						className="btn btn-secondary flex gap-x-2 text-base-100"
					>
						<FaSignInAlt className="w-5 h-5" /> Sign in
					</button>
				) : (
					<button
						onClick={() => void signOut()}
						className="btn btn-secondary flex gap-x-2 text-base-100"
					>
						<FaSignOutAlt className="w-5 h-5" /> Sign out
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
