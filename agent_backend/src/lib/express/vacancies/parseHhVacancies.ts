import { HhVacancyItem, HhVacancyItemSchema } from '@/types/vacancies/HhVacancyItem';
import { removeHtmlTags } from '@/utils/removeHtmlTags';

export const parseHhVacancies = async (
  vacancies: (unknown & { id: string })[]
): Promise<HhVacancyItem[]> => {
  const parsedVacancies = await Promise.allSettled(
    vacancies.map((item: unknown & { id: string }) => {
      return fetch(`https://api.hh.ru/vacancies/${item.id}`).then(async (response) => {
        if (!response.ok) {
          throw new Error('something went wrong');
        }

        const json = await response.json();
        const parsedItem = HhVacancyItemSchema.parse(json);
        if (parsedItem.description) {
          parsedItem.description = removeHtmlTags(parsedItem.description);
        }
        if (parsedItem.branded_description) {
          parsedItem.branded_description = removeHtmlTags(parsedItem.branded_description);
        }

        return parsedItem;
      });
    })
  );

  return parsedVacancies
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<HhVacancyItem>).value);
};
