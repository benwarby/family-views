import { AdminLayoutFn } from "../../../components/admin/admin-layout";
import ViewsEditor from "../views-editor";

export default function ViewAdmin() {
    return (<>
    Views Admin
        <ViewsEditor></ViewsEditor></>)
}

ViewAdmin.getLayout = AdminLayoutFn