import { siteConfig } from "../../config/siteConfig";
import { ButtonLink, type ButtonVariant } from "./Button";

type Props = { children?: string; variant?: ButtonVariant; size?: "md" | "sm"; onClick?: () => void };

/**
 * Every "Join" button. With an invite link configured it goes straight there; without one
 * it leads to the join section, which says honestly that the invite isn't out yet.
 */
export function JoinLink({ children = "Join the Community", variant = "primary", size, onClick }: Props) {
  const href = siteConfig.links.communityInvite ?? "#join";
  return (
    <ButtonLink href={href} variant={variant} size={size} onClick={onClick}>
      {children}
    </ButtonLink>
  );
}
