import { UseMutationResult } from "@tanstack/react-query";

import { DialogMessage, GetDialogResponse } from "../../get/model";
import { SendMessageRequest, SendMessageResponse } from "../../send/model";

export interface GetDialogResponseV2 extends GetDialogResponse {
    hints: DialogMessage[];
}

export interface UseDialog {
    dialog: GetDialogResponseV2 | null;
    sendMessage: UseMutationResult<SendMessageResponse, Error, SendMessageRequest, unknown>;
}