import { TagsStructure } from './../common/interface/tag.interface';
export class FormService {
  saveOnIndexedDB(tagsStructure: TagsStructure[], formName: string) {
    console.log(tagsStructure, ':', formName);
  }
}
