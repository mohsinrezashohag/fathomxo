import { z } from 'zod';

/**
 * Validates a content module at load time, so a malformed entry fails
 * `bun run build` rather than rendering a broken card for a visitor.
 *
 * The thrown message names the module, the entry index and the field path,
 * because whoever fixes it is editing a data file, not reading a stack trace.
 */
export function parseContent<T extends z.ZodType>(
  schema: T,
  entries: unknown[],
  label: string
): z.output<T>[] {
  return entries.map((entry, index) => {
    const result = schema.safeParse(entry);
    if (result.success) return result.data;

    const problems = result.error.issues
      .map((issue) => {
        const path = issue.path.length ? issue.path.join('.') : '(root)';
        return `    ${path}: ${issue.message}`;
      })
      .join('\n');

    throw new Error(`Invalid content in ${label}, entry ${index}:\n${problems}`);
  });
}

/** Single-object variant, for modules that export one record rather than a list. */
export function parseContentItem<T extends z.ZodType>(
  schema: T,
  entry: unknown,
  label: string
): z.output<T> {
  return parseContent(schema, [entry], label)[0];
}
