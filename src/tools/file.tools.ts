const re = {
  bracket: /\[.*]/g,
  curly: /\(.*\)/g,
  prefix: /^\s*[0-9]+\s*-\s*/,
  spaces: /\s+(\.[a-z0-9]+)$/,
  extension: /\.[a-z0-9]+$/,
};

/**
 * Remove the tags and numeric prefix from a filename
 * @param file
 */
export function cleanFileName(file: string): string {
  return file
    .replace(re.bracket, '') // remove the bracket
    .replace(re.curly, '') // remove the curly bracket
    .replace(re.prefix, '') // remove the numeric prefix due to collection counter i.e. "1234 - game.zip" => "game.zip"
    .replace(re.spaces, '$1') // remove the spaces between the file extension
    .trim();
}

export function removeExtension(file: string) {
  return file.replace(re.extension, '');
}
