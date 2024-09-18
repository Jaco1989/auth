import Permits from "./_components/Permits";
import { fetchPermits } from "./actions";

const PermitPage = async () => {
  const result = await fetchPermits();

  if ("error" in result) {
    return <div>Error: {result.error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {result.permits.map((permit) => (
          <Permits permit={permit} key={permit.id} />
        ))}
      </div>
    </div>
  );
};

export default PermitPage;
