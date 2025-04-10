import { TableRowSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";
import Table from "@/app/ui/customers/table";
import { fetchFilteredCustomers } from "@/app/lib/data";

export const metadata: Metadata = {
	title: "Customers",
};

export default async function page(props: {
	searchParams?: Promise<{
		query?: string;
		page?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const customers = await fetchFilteredCustomers(query);

	return (
		<Suspense key={query + currentPage} fallback={<TableRowSkeleton />}>
			<Table customers={customers} />
		</Suspense>
	);
}
