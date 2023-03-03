import AttributeInput from "../AttributeInput/AttributeInput";
import FileInput from "../FileInput/FileInput";
import RoyaltyInput from "../RoyaltyInput/RoyaltyInput";
import TextInput from "../TextInput/TextInput";

export const newCollection = () => [
  <>
    <TextInput type="text" name="Contract Name" required collection />
    <TextInput type="text" name="Symbol" required collection />
  </>,
  <>
    <FileInput key={1} name="File" collection />,
    <TextInput
      type="text-area"
      name="Description"
      description="The description will be included on the item's detail page underneath its image."
      optional
    />
  </>,
  <RoyaltyInput key={2} name="Royalty" />,
  <>
    <FileInput name="File" preview collection />
    <RoyaltyInput name="Royalty" preview />
  </>,
];

export const newContract = () => [
  <>
    <TextInput type="text" name="Contract Name" required collection />
    <TextInput type="text" name="Symbol" required collection />
  </>,
  <>
    <FileInput name="File" />
    <TextInput type="text" name="Name" required />
    <TextInput type="text-area" name="Description" required />
    <AttributeInput name="Attributes" />
  </>,
  <RoyaltyInput key={3} name="Royalty" />,
  <>
    <FileInput name="File" preview />
    <TextInput type="text" name="Name" required preview />
    <TextInput type="text-area" name="Description" required preview />
    <AttributeInput name="Attributes" preview />
    <RoyaltyInput name="Royalty" preview />
  </>,
];

export const existingContract = () => [
  <>
    <FileInput name="File" />
    <TextInput type="text" name={"Name"} required />
    <TextInput type="text-area" name={"Description"} required />
    <AttributeInput name="Attributes" />
  </>,
  <>
    <FileInput name="File" preview />
    <TextInput type="text" name={"Name"} required preview />
    <TextInput type="text-area" name={"Description"} required preview />
    <AttributeInput name="Attributes" preview />
  </>,
];
