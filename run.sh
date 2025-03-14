#!/usr/bin/env bash

# Extract the provided commands from the stringified JSON array.
IFS=$'\n' read -rd '' -a userCommands < <((jq -c -r '.[]') <<<"$1")

# Invoke the provided commands in parallel and collect their exit codes.
pids=()
for userCommand in "${userCommands[@]}"; do
  eval "$userCommand" & pids+=($!)
done

failed=""
# wait for all of the jobs 
# in case we want to aggregate eg: reports
for pid in "${pids[@]}"; do
  if ! wait "$pid"; then
    #exit 1
    failed="true"
  fi
done

if [[ "$failed" == "false" ]]; then
  exit 1
else
  exit 0
fi
