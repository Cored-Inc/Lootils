import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import React from "react";

// Fonts
import "@fontsource/open-sans";
import "@fontsource/raleway";

import { api } from "~/utils/api";
import { NextComponentType } from "next";

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}: {
	Component: NextComponentType;
	pageProps: { session: Session | null };
}) => {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
