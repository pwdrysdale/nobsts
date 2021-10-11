import { introduceMyself } from "../src";

describe("introduceMyself", () => {
    it("should introduce me", () => {
        expect(introduceMyself("Peter", "Drysdale")).toEqual(
            "Hello Peter Drysdale"
        );
    });
});
