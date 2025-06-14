import { DialogMessage, GetDialogResponse } from "../../get/model";

export interface GetDialogResponseV2 extends GetDialogResponse {
    hints: DialogMessage[];
}

export interface UseDialog {
    dialog: GetDialogResponseV2 | null;
}