import { serializeKeywordSkillCard } from './keywordSkillCard';
import { deserializeKeywordSkillCard } from './keywordSkillCard';
import { serializeTimelineSkillCard } from './timelineSkillCard';
import { deserializeTimelineSkillCard } from './timelineSkillCard';
import { serializeTranscriptSkillCard } from './transcriptSkillCard';
import { deserializeTranscriptSkillCard } from './transcriptSkillCard';
import { serializeStatusSkillCard } from './statusSkillCard';
import { deserializeStatusSkillCard } from './statusSkillCard';
import { serializeSkillCard } from './skillCard';
import { deserializeSkillCard } from './skillCard';
import { KeywordSkillCard } from './keywordSkillCard';
import { TimelineSkillCard } from './timelineSkillCard';
import { TranscriptSkillCard } from './transcriptSkillCard';
import { StatusSkillCard } from './statusSkillCard';
import { SkillCard } from './skillCard';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface SkillCardsMetadata {
  /**
   * Whether the user can edit this metadata. */
  readonly canEdit?: boolean;
  /**
   * A UUID to identify the metadata object. */
  readonly id?: string;
  /**
   * An ID for the parent folder. */
  readonly parent?: string;
  /**
   * An ID for the scope in which this template
   * has been applied. */
  readonly scope?: string;
  /**
   * The name of the template. */
  readonly template?: string;
  /**
   * A unique identifier for the "type" of this instance. This is an internal
   * system property and should not be used by a client application. */
  readonly type?: string;
  /**
   * The last-known version of the template of the object. This is an internal
   * system property and should not be used by a client application. */
  readonly typeVersion?: number;
  /**
   * The version of the metadata object. Starts at 0 and increases every time
   * a user-defined property is modified. */
  readonly version?: number;
  /**
   * A list of Box Skill cards that have been applied to this file. */
  readonly cards?: readonly SkillCard[];
  readonly rawData?: SerializedData;
}
export function serializeSkillCardsMetadata(
  val: SkillCardsMetadata,
): SerializedData {
  return {
    ['$canEdit']: val.canEdit,
    ['$id']: val.id,
    ['$parent']: val.parent,
    ['$scope']: val.scope,
    ['$template']: val.template,
    ['$type']: val.type,
    ['$typeVersion']: val.typeVersion,
    ['$version']: val.version,
    ['cards']:
      val.cards == void 0
        ? val.cards
        : (val.cards.map(function (item: SkillCard): SerializedData {
            return serializeSkillCard(item);
          }) as readonly any[]),
  };
}
export function deserializeSkillCardsMetadata(
  val: SerializedData,
): SkillCardsMetadata {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SkillCardsMetadata"',
    });
  }
  if (!(val.$canEdit == void 0) && !sdIsBoolean(val.$canEdit)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "$canEdit" of type "SkillCardsMetadata"',
    });
  }
  const canEdit: undefined | boolean =
    val.$canEdit == void 0 ? void 0 : val.$canEdit;
  if (!(val.$id == void 0) && !sdIsString(val.$id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$id" of type "SkillCardsMetadata"',
    });
  }
  const id: undefined | string = val.$id == void 0 ? void 0 : val.$id;
  if (!(val.$parent == void 0) && !sdIsString(val.$parent)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$parent" of type "SkillCardsMetadata"',
    });
  }
  const parent: undefined | string =
    val.$parent == void 0 ? void 0 : val.$parent;
  if (!(val.$scope == void 0) && !sdIsString(val.$scope)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$scope" of type "SkillCardsMetadata"',
    });
  }
  const scope: undefined | string = val.$scope == void 0 ? void 0 : val.$scope;
  if (!(val.$template == void 0) && !sdIsString(val.$template)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$template" of type "SkillCardsMetadata"',
    });
  }
  const template: undefined | string =
    val.$template == void 0 ? void 0 : val.$template;
  if (!(val.$type == void 0) && !sdIsString(val.$type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "$type" of type "SkillCardsMetadata"',
    });
  }
  const type: undefined | string = val.$type == void 0 ? void 0 : val.$type;
  if (!(val.$typeVersion == void 0) && !sdIsNumber(val.$typeVersion)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "$typeVersion" of type "SkillCardsMetadata"',
    });
  }
  const typeVersion: undefined | number =
    val.$typeVersion == void 0 ? void 0 : val.$typeVersion;
  if (!(val.$version == void 0) && !sdIsNumber(val.$version)) {
    throw new BoxSdkError({
      message: 'Expecting number for "$version" of type "SkillCardsMetadata"',
    });
  }
  const version: undefined | number =
    val.$version == void 0 ? void 0 : val.$version;
  if (!(val.cards == void 0) && !sdIsList(val.cards)) {
    throw new BoxSdkError({
      message: 'Expecting array for "cards" of type "SkillCardsMetadata"',
    });
  }
  const cards: undefined | readonly SkillCard[] =
    val.cards == void 0
      ? void 0
      : sdIsList(val.cards)
        ? (val.cards.map(function (itm: SerializedData): SkillCard {
            return deserializeSkillCard(itm);
          }) as readonly any[])
        : [];
  return {
    canEdit: canEdit,
    id: id,
    parent: parent,
    scope: scope,
    template: template,
    type: type,
    typeVersion: typeVersion,
    version: version,
    cards: cards,
  } satisfies SkillCardsMetadata;
}
