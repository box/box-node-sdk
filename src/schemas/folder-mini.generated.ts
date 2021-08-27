import * as schemas from '.';
/**
 * Folder (Mini)
 *
 * A mini representation of a file version, used when
 * nested under another resource.
 */
export interface FolderMini extends schemas.FolderBase {
	/**
	 * A numeric identifier that represents the most recent user event
	 * that has been applied to this item.
	 *
	 * This can be used in combination with the `GET /events`-endpoint
	 * to filter out user events that would have occurred before this
	 * identifier was read.
	 *
	 * An example would be where a Box Drive-like application
	 * would fetch an item via the API, and then listen to incoming
	 * user events for changes to the item. The application would
	 * ignore any user events where the `sequence_id` in the event
	 * is smaller than or equal to the `sequence_id` in the originally
	 * fetched resource.
	 * Example: 3
	 */
	sequence_id?: string;
	/**
	 * The name of the folder.
	 * Example: Contracts
	 */
	name?: string;
}
