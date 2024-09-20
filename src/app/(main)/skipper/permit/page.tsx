import Permits from "./_components/Permits";
import { fetchPermits } from "./actions";
import Link from "next/link";

const PAGE_SIZE = 3;

const PermitPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = Number(searchParams.page) || 1;
  const result = await fetchPermits(page, PAGE_SIZE);

  if ("error" in result) {
    return <div>Error: {result.error}</div>;
  }

  const totalPages = Math.ceil(result.totalCount / PAGE_SIZE);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {result.permits.map((permit) => (
          <Permits permit={permit} key={permit.id} />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center space-x-4">
        {page > 1 && (
          <Link
            href={`?page=${page - 1}`}
            className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
          >
            Previous
          </Link>
        )}
        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <Link
            href={`?page=${page + 1}`}
            className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default PermitPage;
