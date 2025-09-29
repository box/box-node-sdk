import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeKeywordSkillCardTypeField } from '@/schemas/keywordSkillCard';
import { deserializeKeywordSkillCardTypeField } from '@/schemas/keywordSkillCard';
import { serializeKeywordSkillCardSkillCardTypeField } from '@/schemas/keywordSkillCard';
import { deserializeKeywordSkillCardSkillCardTypeField } from '@/schemas/keywordSkillCard';
import { serializeKeywordSkillCardSkillCardTitleField } from '@/schemas/keywordSkillCard';
import { deserializeKeywordSkillCardSkillCardTitleField } from '@/schemas/keywordSkillCard';
import { serializeKeywordSkillCardSkillField } from '@/schemas/keywordSkillCard';
import { deserializeKeywordSkillCardSkillField } from '@/schemas/keywordSkillCard';
import { serializeKeywordSkillCardSkillTypeField } from '@/schemas/keywordSkillCard';
import { deserializeKeywordSkillCardSkillTypeField } from '@/schemas/keywordSkillCard';
import { serializeKeywordSkillCardInvocationField } from '@/schemas/keywordSkillCard';
import { deserializeKeywordSkillCardInvocationField } from '@/schemas/keywordSkillCard';
import { serializeKeywordSkillCardInvocationTypeField } from '@/schemas/keywordSkillCard';
import { deserializeKeywordSkillCardInvocationTypeField } from '@/schemas/keywordSkillCard';
import { serializeKeywordSkillCardEntriesField } from '@/schemas/keywordSkillCard';
import { deserializeKeywordSkillCardEntriesField } from '@/schemas/keywordSkillCard';
import { serializeTimelineSkillCard } from '@/schemas/timelineSkillCard';
import { deserializeTimelineSkillCard } from '@/schemas/timelineSkillCard';
import { serializeTranscriptSkillCard } from '@/schemas/transcriptSkillCard';
import { deserializeTranscriptSkillCard } from '@/schemas/transcriptSkillCard';
import { serializeStatusSkillCard } from '@/schemas/statusSkillCard';
import { deserializeStatusSkillCard } from '@/schemas/statusSkillCard';
import { serializeSkillCardsMetadata } from '@/schemas/skillCardsMetadata';
import { deserializeSkillCardsMetadata } from '@/schemas/skillCardsMetadata';
import { serializeCreateBoxSkillCardsOnFileRequestBody } from '@/managers/skills';
import { deserializeCreateBoxSkillCardsOnFileRequestBody } from '@/managers/skills';
import { serializeUpdateBoxSkillCardsOnFileRequestBody } from '@/managers/skills';
import { deserializeUpdateBoxSkillCardsOnFileRequestBody } from '@/managers/skills';
import { serializeUpdateBoxSkillCardsOnFileRequestBodyOpField } from '@/managers/skills';
import { deserializeUpdateBoxSkillCardsOnFileRequestBodyOpField } from '@/managers/skills';
import { serializeKeywordSkillCard } from '@/schemas/keywordSkillCard';
import { deserializeKeywordSkillCard } from '@/schemas/keywordSkillCard';
import { serializeSkillCard } from '@/schemas/skillCard';
import { deserializeSkillCard } from '@/schemas/skillCard';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { KeywordSkillCardTypeField } from '@/schemas/keywordSkillCard';
import { KeywordSkillCardSkillCardTypeField } from '@/schemas/keywordSkillCard';
import { KeywordSkillCardSkillCardTitleField } from '@/schemas/keywordSkillCard';
import { KeywordSkillCardSkillField } from '@/schemas/keywordSkillCard';
import { KeywordSkillCardSkillTypeField } from '@/schemas/keywordSkillCard';
import { KeywordSkillCardInvocationField } from '@/schemas/keywordSkillCard';
import { KeywordSkillCardInvocationTypeField } from '@/schemas/keywordSkillCard';
import { KeywordSkillCardEntriesField } from '@/schemas/keywordSkillCard';
import { TimelineSkillCard } from '@/schemas/timelineSkillCard';
import { TranscriptSkillCard } from '@/schemas/transcriptSkillCard';
import { StatusSkillCard } from '@/schemas/statusSkillCard';
import { SkillCardsMetadata } from '@/schemas/skillCardsMetadata';
import { CreateBoxSkillCardsOnFileRequestBody } from '@/managers/skills';
import { UpdateBoxSkillCardsOnFileRequestBody } from '@/managers/skills';
import { UpdateBoxSkillCardsOnFileRequestBodyOpField } from '@/managers/skills';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
import { KeywordSkillCard } from '@/schemas/keywordSkillCard';
import { SkillCard } from '@/schemas/skillCard';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
