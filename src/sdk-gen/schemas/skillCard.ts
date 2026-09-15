import { serializeKeywordSkillCard } from './keywordSkillCard';
import { deserializeKeywordSkillCard } from './keywordSkillCard';
import { serializeTimelineSkillCard } from './timelineSkillCard';
import { deserializeTimelineSkillCard } from './timelineSkillCard';
import { serializeTranscriptSkillCard } from './transcriptSkillCard';
import { deserializeTranscriptSkillCard } from './transcriptSkillCard';
import { serializeStatusSkillCard } from './statusSkillCard';
import { deserializeStatusSkillCard } from './statusSkillCard';
import { KeywordSkillCard } from './keywordSkillCard';
import { TimelineSkillCard } from './timelineSkillCard';
import { TranscriptSkillCard } from './transcriptSkillCard';
import { StatusSkillCard } from './statusSkillCard';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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
