import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeKeywordSkillCardTypeField } from '../schemas/keywordSkillCard.js';
import { deserializeKeywordSkillCardTypeField } from '../schemas/keywordSkillCard.js';
import { serializeKeywordSkillCardSkillCardTypeField } from '../schemas/keywordSkillCard.js';
import { deserializeKeywordSkillCardSkillCardTypeField } from '../schemas/keywordSkillCard.js';
import { serializeKeywordSkillCardSkillCardTitleField } from '../schemas/keywordSkillCard.js';
import { deserializeKeywordSkillCardSkillCardTitleField } from '../schemas/keywordSkillCard.js';
import { serializeKeywordSkillCardSkillField } from '../schemas/keywordSkillCard.js';
import { deserializeKeywordSkillCardSkillField } from '../schemas/keywordSkillCard.js';
import { serializeKeywordSkillCardSkillTypeField } from '../schemas/keywordSkillCard.js';
import { deserializeKeywordSkillCardSkillTypeField } from '../schemas/keywordSkillCard.js';
import { serializeKeywordSkillCardInvocationField } from '../schemas/keywordSkillCard.js';
import { deserializeKeywordSkillCardInvocationField } from '../schemas/keywordSkillCard.js';
import { serializeKeywordSkillCardInvocationTypeField } from '../schemas/keywordSkillCard.js';
import { deserializeKeywordSkillCardInvocationTypeField } from '../schemas/keywordSkillCard.js';
import { serializeKeywordSkillCardEntriesField } from '../schemas/keywordSkillCard.js';
import { deserializeKeywordSkillCardEntriesField } from '../schemas/keywordSkillCard.js';
import { serializeTimelineSkillCard } from '../schemas/timelineSkillCard.js';
import { deserializeTimelineSkillCard } from '../schemas/timelineSkillCard.js';
import { serializeTranscriptSkillCard } from '../schemas/transcriptSkillCard.js';
import { deserializeTranscriptSkillCard } from '../schemas/transcriptSkillCard.js';
import { serializeStatusSkillCard } from '../schemas/statusSkillCard.js';
import { deserializeStatusSkillCard } from '../schemas/statusSkillCard.js';
import { serializeSkillCardsMetadata } from '../schemas/skillCardsMetadata.js';
import { deserializeSkillCardsMetadata } from '../schemas/skillCardsMetadata.js';
import { serializeCreateBoxSkillCardsOnFileRequestBody } from '../managers/skills.js';
import { deserializeCreateBoxSkillCardsOnFileRequestBody } from '../managers/skills.js';
import { serializeUpdateBoxSkillCardsOnFileRequestBody } from '../managers/skills.js';
import { deserializeUpdateBoxSkillCardsOnFileRequestBody } from '../managers/skills.js';
import { serializeUpdateBoxSkillCardsOnFileRequestBodyOpField } from '../managers/skills.js';
import { deserializeUpdateBoxSkillCardsOnFileRequestBodyOpField } from '../managers/skills.js';
import { serializeKeywordSkillCard } from '../schemas/keywordSkillCard.js';
import { deserializeKeywordSkillCard } from '../schemas/keywordSkillCard.js';
import { serializeSkillCard } from '../schemas/skillCard.js';
import { deserializeSkillCard } from '../schemas/skillCard.js';
import { BoxClient } from '../client.js';
import { FileFull } from '../schemas/fileFull.js';
import { KeywordSkillCardTypeField } from '../schemas/keywordSkillCard.js';
import { KeywordSkillCardSkillCardTypeField } from '../schemas/keywordSkillCard.js';
import { KeywordSkillCardSkillCardTitleField } from '../schemas/keywordSkillCard.js';
import { KeywordSkillCardSkillField } from '../schemas/keywordSkillCard.js';
import { KeywordSkillCardSkillTypeField } from '../schemas/keywordSkillCard.js';
import { KeywordSkillCardInvocationField } from '../schemas/keywordSkillCard.js';
import { KeywordSkillCardInvocationTypeField } from '../schemas/keywordSkillCard.js';
import { KeywordSkillCardEntriesField } from '../schemas/keywordSkillCard.js';
import { TimelineSkillCard } from '../schemas/timelineSkillCard.js';
import { TranscriptSkillCard } from '../schemas/transcriptSkillCard.js';
import { StatusSkillCard } from '../schemas/statusSkillCard.js';
import { SkillCardsMetadata } from '../schemas/skillCardsMetadata.js';
import { CreateBoxSkillCardsOnFileRequestBody } from '../managers/skills.js';
import { UpdateBoxSkillCardsOnFileRequestBody } from '../managers/skills.js';
import { UpdateBoxSkillCardsOnFileRequestBodyOpField } from '../managers/skills.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { uploadNewFile } from './commons.js';
import { KeywordSkillCard } from '../schemas/keywordSkillCard.js';
import { SkillCard } from '../schemas/skillCard.js';
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
  const cardsToCreate: readonly SkillCard[] = [cardToCreate];
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
