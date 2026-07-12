import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const title = "Avatar";

const Example = () => (
  <Avatar>
    <AvatarImage
      alt="@dovazencot"
      src="https://github.com/dovazencot.png"
    />
    <AvatarFallback>DA</AvatarFallback>
  </Avatar>
);

export default Example;
