import { useMonth } from "@/components/date-provider";
import { Buttons, Form, useScreen } from "@/components/details";
import { db } from "@/db";
import { expenses, payments } from "@/db/schema";
import { defaultTimeZone } from "@/i18n";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function AddScreen() {
  const { t } = useTranslation();
  const state = useScreen();
  const month = useMonth();

  async function create(isPaid: boolean) {
    const startDate = new Date();
    let endDate: Date | null | undefined = startDate;
    if (state.isInstallments) {
      const installmentCount = state.installmentCount
        ? Number.parseInt(state.installmentCount)
        : 1;

      const nextMonthsInstant = month.asMonth
        .add({ months: Math.max(0, installmentCount - 1) })
        .toPlainDate({ day: 1 })
        .toZonedDateTime(defaultTimeZone);
      endDate = new Date(nextMonthsInstant.epochMilliseconds);
    } else if (state.isRepeated) {
      endDate = state.expiryDate ? parseDate(state.expiryDate) : null;
    }
    const { lastInsertRowId } = await db.insert(expenses).values({
      description: state.description || "-",
      value: state.value ?? 0,
      isRevenue: state.isRevenue,
      isInstallment: state.isInstallments,
      endDate,
      startDate,
    });

    if (isPaid) {
      await db.insert(payments).values({
        expenseId: lastInsertRowId,
        paidAt: new Date(),
        value: state.value ?? 0,
      });
    }
  }

  return (
    <View className="flex h-full justify-between p-8">
      <Form state={state} />
      <Buttons
        onComplete={() =>
          router.replace({
            pathname: "/[dateString]/(home)",
            params: { dateString: month.asString },
          })
        }
        update={{
          fn: () => create(false),
          label: t("update.add"),
        }}
        paid={{
          fn: () => create(true),
          label: t("update.paid"),
          variant: "primary",
        }}
        remove={{
          fn: async () => {},
          label: t("update.remove"),
        }}
      />
    </View>
  );
}

function parseDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Expiry date must use YYYY-MM-DD format");
  }
  return date;
}
