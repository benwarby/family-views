import { ViewTabIdInfoType } from "@family-views/common";
import ViewEditor from "../../../components/admin/view/view-editor";
import { AdminLayoutFn } from "../../../components/admin/admin-layout";

export default function NewView() {
    let view:ViewTabIdInfoType = {
        viewInfoId:'',
        displayName: '',
        description: '',
        tabTransitionInSeconds: 0,
        tabIds: []
    }
    return (<><ViewEditor viewToEdit={view}></ViewEditor></>)
}
NewView.getLayout = AdminLayoutFn;