import { customAlphabet } from "nanoid";

// remove 0, O, I, l, aka ambiguous characters
const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

export function new_id(size: number = 12) {
  return customAlphabet(alphabet, size)()
}
