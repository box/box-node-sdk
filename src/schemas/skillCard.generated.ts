import { serializeKeywordSkillCard } from './keywordSkillCard.generated.js';
import { deserializeKeywordSkillCard } from './keywordSkillCard.generated.js';
import { serializeTimelineSkillCard } from './timelineSkillCard.generated.js';
import { deserializeTimelineSkillCard } from './timelineSkillCard.generated.js';
import { serializeTranscriptSkillCard } from './transcriptSkillCard.generated.js';
import { deserializeTranscriptSkillCard } from './transcriptSkillCard.generated.js';
import { serializeStatusSkillCard } from './statusSkillCard.generated.js';
import { deserializeStatusSkillCard } from './statusSkillCard.generated.js';
import { KeywordSkillCard } from './keywordSkillCard.generated.js';
import { TimelineSkillCard } from './timelineSkillCard.generated.js';
import { TranscriptSkillCard } from './transcriptSkillCard.generated.js';
import { StatusSkillCard } from './statusSkillCard.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type SkillCard =
  | KeywordSkillCard
  | TimelineSkillCard
  | TranscriptSkillCard
  | StatusSkillCard;
export function serializeSkillCard(val: any): SerializedData {
  if (val.skillCardType == 'keyword') {
    return serializeKeywordSkillCard(val);
  }
  if (val.skillCardType == 'timeline') {
    return serializeTimelineSkillCard(val);
  }
  if (val.skillCardType == 'transcript') {
    return serializeTranscriptSkillCard(val);
  }
  if (val.skillCardType == 'status') {
    return serializeStatusSkillCard(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeSkillCard(val: SerializedData): SkillCard {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "SkillCard"' });
  }
  if (val.skill_card_type == 'keyword') {
    return deserializeKeywordSkillCard(val);
  }
  if (val.skill_card_type == 'timeline') {
    return deserializeTimelineSkillCard(val);
  }
  if (val.skill_card_type == 'transcript') {
    return deserializeTranscriptSkillCard(val);
  }
  if (val.skill_card_type == 'status') {
    return deserializeStatusSkillCard(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize SkillCard" });
}
