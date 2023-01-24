import React from "react";
import { useRouter } from "next/router";

function Artist() {
  const router = useRouter();
  const { id } = router.query;
  return <div>[id]</div>;
}

export default Artist;
