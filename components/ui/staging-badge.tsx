"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;
const getSnapshot = () => window.location.hostname.startsWith("staging.");
const getServerSnapshot = () => false;

export function StagingBadge() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return visible ? <div className="staging-badge" role="status">STAGING</div> : null;
}
