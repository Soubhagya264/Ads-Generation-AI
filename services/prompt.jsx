export const GENERATE_SCRIPT_PROMPT = `Topic:{topic}
Generate exactly 3 unique 30-second ad video scripts as JSON array only. Do not include any text or explanation before or after. Each script should be a single paragraph. Format:
[
  { "content": "..." },
  { "content": "..." },
  { "content": "..." }
]
Return valid raw JSON only.
`;
