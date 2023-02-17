export interface PropType {
  text1?: string;
  text2?: string;
  setText1: React.Dispatch<React.SetStateAction<string | undefined>>;
  setText2: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface DisplayProp {
    text1?: string;
    text2?: string;
}

export interface Name {
    first?: string
    last?: string
}