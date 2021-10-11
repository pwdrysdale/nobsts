import { borgName } from "../src/index";

describe("borgName", () => {
    it("should give me a borgname", () => {
        const myName = borgName();
        const out = myName.match(/^Your Borg name is (\d+) of (\d+)/);
        if (out) {
            const [_, n1, n2] = out;
            expect(parseInt(n1) <= parseInt(n2)).toBeTruthy();
        }
    });
});
