import {
  GetIdTokenConfiguration,
  MagicPayloadMethod,
  MagicUserMetadata,
  GenerateIdTokenConfiguration,
  UpdateEmailConfiguration,
} from '@magic-sdk/types';
import { BaseModule } from '../base-module';
import { createJsonRpcRequestPayload } from '../../core/json-rpc';

type UpdateEmailEvents = {
  'email-sent': () => void;
  'email-not-deliverable': () => void;
  'old-email-confirmed': () => void;
  'new-email-confirmed': () => void;
  retry: () => void;
};

export class UserModule extends BaseModule {
  /** */
  public getIdToken(configuration?: GetIdTokenConfiguration) {
    const requestPayload = createJsonRpcRequestPayload(MagicPayloadMethod.GetIdToken, [configuration]);
    return this.request<string>(requestPayload);
  }

  /** */
  public generateIdToken(configuration?: GenerateIdTokenConfiguration) {
    const requestPayload = createJsonRpcRequestPayload(MagicPayloadMethod.GenerateIdToken, [configuration]);
    return this.request<string>(requestPayload);
  }

  /** */
  public getMetadata() {
    const requestPayload = createJsonRpcRequestPayload(MagicPayloadMethod.GetMetadata);
    return this.request<MagicUserMetadata>(requestPayload);
  }

  /** */
  public updateEmail(configuration: UpdateEmailConfiguration) {
    const { email, showUI = true } = configuration;
    const requestPayload = createJsonRpcRequestPayload(MagicPayloadMethod.UpdateEmail, [{ email, showUI }]);
    return this.request<string | null, UpdateEmailEvents>(requestPayload);
  }

  /** */
  public isLoggedIn() {
    const requestPayload = createJsonRpcRequestPayload(MagicPayloadMethod.IsLoggedIn);
    return this.request<boolean>(requestPayload);
  }

  /** */
  public logout() {
    const requestPayload = createJsonRpcRequestPayload(MagicPayloadMethod.Logout);
    return this.request<boolean>(requestPayload);
  }
}
