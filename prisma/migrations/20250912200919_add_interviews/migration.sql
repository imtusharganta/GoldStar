-- CreateTable
CREATE TABLE "public"."Interview" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
