import { getExclusivePosts, getLockedContentCount } from "@/lib/data";
import RewardsClient from "./RewardsClient";

export default async function RewardsPage() {
  const exclusiveItems = await getExclusivePosts();
  const lockedCount = await getLockedContentCount();

  return <RewardsClient exclusiveItems={exclusiveItems} lockedCount={lockedCount} />;
}
