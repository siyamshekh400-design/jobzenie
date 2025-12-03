import { adminApplicaitonColumns } from "@/components/tables/admin-user-table/admin-application-column";
import { AdminApplicationTable } from "@/components/tables/admin-user-table/admin-application-table";
import { getAdminPendingApplications } from "@/lib/actions/admin.action";

const AdminApplications = async () => {
  const { data } = await getAdminPendingApplications();
  return <AdminApplicationTable columns={adminApplicaitonColumns} data={data?.applications} />;
};
export default AdminApplications;
