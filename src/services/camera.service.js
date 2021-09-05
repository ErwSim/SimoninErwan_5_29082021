import { GlobalService } from "./global.service.js";

export class CameraService extends GlobalService {
  constructor() {
    super();

    this.service = "cameras";
  }
}
