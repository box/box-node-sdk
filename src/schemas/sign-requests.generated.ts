import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * Box Sign
 * 
 * The part of an API response that describes marker
 * based pagination
 */
export interface SignRequests {
    /**
     */
    entries?: schemas.SignRequest[];
}
