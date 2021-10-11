export interface TagStructure {
  formName: string;
  inputType: string;
  inputLabel: string;
  inputValue: tagValue[];
}

export interface TagsStructure {
  inputType: string;
  inputLabel: string;
  inputValue: tagValue[];
}
export interface tagValue {
  value: string;
}
