import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeKeywordSkillCardTypeField } from '../schemas/keywordSkillCard.generated.js';
import { deserializeKeywordSkillCardTypeField } from '../schemas/keywordSkillCard.generated.js';
import { serializeKeywordSkillCardSkillCardTypeField } from '../schemas/keywordSkillCard.generated.js';
import { deserializeKeywordSkillCardSkillCardTypeField } from '../schemas/keywordSkillCard.generated.js';
import { serializeKeywordSkillCardSkillCardTitleField } from '../schemas/keywordSkillCard.generated.js';
import { deserializeKeywordSkillCardSkillCardTitleField } from '../schemas/keywordSkillCard.generated.js';
import { serializeKeywordSkillCardSkillField } from '../schemas/keywordSkillCard.generated.js';
import { deserializeKeywordSkillCardSkillField } from '../schemas/keywordSkillCard.generated.js';
import { serializeKeywordSkillCardSkillTypeField } from '../schemas/keywordSkillCard.generated.js';
import { deserializeKeywordSkillCardSkillTypeField } from '../schemas/keywordSkillCard.generated.js';
import { serializeKeywordSkillCardInvocationField } from '../schemas/keywordSkillCard.generated.js';
import { deserializeKeywordSkillCardInvocationField } from '../schemas/keywordSkillCard.generated.js';
import { serializeKeywordSkillCardInvocationTypeField } from '../schemas/keywordSkillCard.generated.js';
import { deserializeKeywordSkillCardInvocationTypeField } from '../schemas/keywordSkillCard.generated.js';
import { serializeKeywordSkillCardEntriesField } from '../schemas/keywordSkillCard.generated.js';
import { deserializeKeywordSkillCardEntriesField } from '../schemas/keywordSkillCard.generated.js';
import { serializeStatusSkillCard } from '../schemas/statusSkillCard.generated.js';
import { deserializeStatusSkillCard } from '../schemas/statusSkillCard.generated.js';
import { serializeTimelineSkillCard } from '../schemas/timelineSkillCard.generated.js';
import { deserializeTimelineSkillCard } from '../schemas/timelineSkillCard.generated.js';
import { serializeTranscriptSkillCard } from '../schemas/transcriptSkillCard.generated.js';
import { deserializeTranscriptSkillCard } from '../schemas/transcriptSkillCard.generated.js';
import { serializeSkillCardsMetadata } from '../schemas/skillCardsMetadata.generated.js';
import { deserializeSkillCardsMetadata } from '../schemas/skillCardsMetadata.generated.js';
import { serializeCreateBoxSkillCardsOnFileRequestBody } from '../managers/skills.generated.js';
import { deserializeCreateBoxSkillCardsOnFileRequestBody } from '../managers/skills.generated.js';
import { serializeUpdateBoxSkillCardsOnFileRequestBody } from '../managers/skills.generated.js';
import { deserializeUpdateBoxSkillCardsOnFileRequestBody } from '../managers/skills.generated.js';
import { serializeUpdateBoxSkillCardsOnFileRequestBodyOpField } from '../managers/skills.generated.js';
import { deserializeUpdateBoxSkillCardsOnFileRequestBodyOpField } from '../managers/skills.generated.js';
import { serializeKeywordSkillCard } from '../schemas/keywordSkillCard.generated.js';
import { deserializeKeywordSkillCard } from '../schemas/keywordSkillCard.generated.js';
import { serializeKeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard } from '../schemas/keywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard.generated.js';
import { deserializeKeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard } from '../schemas/keywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard.generated.js';
import { BoxClient } from '../client.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { KeywordSkillCardTypeField } from '../schemas/keywordSkillCard.generated.js';
import { KeywordSkillCardSkillCardTypeField } from '../schemas/keywordSkillCard.generated.js';
import { KeywordSkillCardSkillCardTitleField } from '../schemas/keywordSkillCard.generated.js';
import { KeywordSkillCardSkillField } from '../schemas/keywordSkillCard.generated.js';
import { KeywordSkillCardSkillTypeField } from '../schemas/keywordSkillCard.generated.js';
import { KeywordSkillCardInvocationField } from '../schemas/keywordSkillCard.generated.js';
import { KeywordSkillCardInvocationTypeField } from '../schemas/keywordSkillCard.generated.js';
import { KeywordSkillCardEntriesField } from '../schemas/keywordSkillCard.generated.js';
import { StatusSkillCard } from '../schemas/statusSkillCard.generated.js';
import { TimelineSkillCard } from '../schemas/timelineSkillCard.generated.js';
import { TranscriptSkillCard } from '../schemas/transcriptSkillCard.generated.js';
import { SkillCardsMetadata } from '../schemas/skillCardsMetadata.generated.js';
import { CreateBoxSkillCardsOnFileRequestBody } from '../managers/skills.generated.js';
import { UpdateBoxSkillCardsOnFileRequestBody } from '../managers/skills.generated.js';
import { UpdateBoxSkillCardsOnFileRequestBodyOpField } from '../managers/skills.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { uploadNewFile } from './commons.generated.js';
import { KeywordSkillCard } from '../schemas/keywordSkillCard.generated.js';
import { KeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard } from '../schemas/keywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard.generated.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('test_skills_cards_CRUD', async function test_skills_cards_CRUD(): Promise<any> {
  const file: FileFull = await uploadNewFile();
  const skillId: string = getUuid();
  const invocationId: string = getUuid();
  const titleMessage: string = 'License Plates';
  const cardToCreate: KeywordSkillCard = new KeywordSkillCard({
    type: 'skill_card' as KeywordSkillCardTypeField,
    skillCardType: 'keyword' as KeywordSkillCardSkillCardTypeField,
    skillCardTitle: {
      code: 'license-plates',
      message: titleMessage,
    } satisfies KeywordSkillCardSkillCardTitleField,
    skill: new KeywordSkillCardSkillField({
      id: skillId,
      type: 'service' as KeywordSkillCardSkillTypeField,
    }),
    invocation: new KeywordSkillCardInvocationField({
      id: invocationId,
      type: 'skill_invocation' as KeywordSkillCardInvocationTypeField,
    }),
    entries: [{ text: 'DN86 BOX' } satisfies KeywordSkillCardEntriesField],
  });
  const cardsToCreate: readonly KeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard[] =
    [cardToCreate];
  const skillCardsMetadata: SkillCardsMetadata =
    await client.skills.createBoxSkillCardsOnFile(file.id, {
      cards: cardsToCreate,
    } satisfies CreateBoxSkillCardsOnFileRequestBody);
  if (!(skillCardsMetadata.cards!.length == 1)) {
    throw new Error('Assertion failed');
  }
  const keywordSkillCard: KeywordSkillCard = skillCardsMetadata
    .cards![0] as KeywordSkillCard;
  if (!(keywordSkillCard.skill.id == skillId)) {
    throw new Error('Assertion failed');
  }
  if (!(keywordSkillCard.skillCardTitle!.message! == titleMessage)) {
    throw new Error('Assertion failed');
  }
  const updatedTitleMessage: string = 'Updated License Plates';
  const cardToUpdate: KeywordSkillCard = new KeywordSkillCard({
    type: 'skill_card' as KeywordSkillCardTypeField,
    skillCardType: 'keyword' as KeywordSkillCardSkillCardTypeField,
    skillCardTitle: {
      code: 'license-plates',
      message: updatedTitleMessage,
    } satisfies KeywordSkillCardSkillCardTitleField,
    skill: new KeywordSkillCardSkillField({
      id: skillId,
      type: 'service' as KeywordSkillCardSkillTypeField,
    }),
    invocation: new KeywordSkillCardInvocationField({
      id: invocationId,
      type: 'skill_invocation' as KeywordSkillCardInvocationTypeField,
    }),
    entries: [{ text: 'DN86 BOX' } satisfies KeywordSkillCardEntriesField],
  });
  const updatedSkillCardsMetadata: SkillCardsMetadata =
    await client.skills.updateBoxSkillCardsOnFile(file.id, [
      {
        op: 'replace' as UpdateBoxSkillCardsOnFileRequestBodyOpField,
        path: '/cards/0',
        value: cardToUpdate,
      } satisfies UpdateBoxSkillCardsOnFileRequestBody,
    ]);
  const updatedKeywordSkillCard: KeywordSkillCard = updatedSkillCardsMetadata
    .cards![0] as KeywordSkillCard;
  if (!(updatedKeywordSkillCard.skill.id == skillId)) {
    throw new Error('Assertion failed');
  }
  if (
    !(updatedKeywordSkillCard.skillCardTitle!.message! == updatedTitleMessage)
  ) {
    throw new Error('Assertion failed');
  }
  const receivedSkillCardsMetadata: SkillCardsMetadata =
    await client.skills.getBoxSkillCardsOnFile(file.id);
  const receivedKeywordSkillCard: KeywordSkillCard = receivedSkillCardsMetadata
    .cards![0] as KeywordSkillCard;
  if (!(receivedKeywordSkillCard.skill.id == skillId)) {
    throw new Error('Assertion failed');
  }
  await client.skills.deleteBoxSkillCardsFromFile(file.id);
  await client.files.deleteFileById(file.id);
});
export {};
