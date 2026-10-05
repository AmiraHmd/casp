import fs from "fs";
const files = [
  "src/app/[locale]/teacher-guide/wafi-guide/page.tsx",
  "src/app/[locale]/teacher-guide/mufid-guide/page.tsx",
  "src/app/[locale]/teacher-guide/happyMuslim-guide/page.tsx",
  "src/app/[locale]/teacher-guide/garden-guide/page.tsx",
  "src/app/[locale]/store/al-mufid/page.tsx",
  "src/app/[locale]/store/the-happy-muslim/page.tsx",
  "src/app/[locale]/store/tareeq-al-muneer-en/page.tsx",
  "src/app/[locale]/store/tareeq-al-muneer/page.tsx",
  "src/app/[locale]/store/hidayah-fr/page.tsx",
  "src/app/[locale]/store/garden-of-arabic/page.tsx",
  "src/app/[locale]/store/al-wafi/page.tsx",
  "src/app/[locale]/store/al-shamil/page.tsx",
  "src/app/[locale]/PrivateBook/page.tsx",
  "src/app/api/pdf/route.ts",
  "src/app/components/Home/VideoSection.tsx",
];
files.forEach((f) => {
  try {
    let content = fs.readFileSync(f, "utf8");
    content = content.replace(
      /3nvnebfanoina0ww\.public\.blob\.vercel-storage\.com/g,
      "pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev",
    );
    fs.writeFileSync(f, content, "utf8");
    console.log("Replaced in " + f);
  } catch (e) {
    console.error("Error in " + f + ": " + e.message);
  }
});
