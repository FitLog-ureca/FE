import Link from "next/link";
import ActionButton from "@/components/ui/ActionButton";

export default function NotFound() {
  return (
    <main className="bg-secondary-100 flex min-h-dvh items-center justify-center px-6">
      <div className="shadow-fitlog-form border-fitlog-beige w-full max-w-md rounded-2xl border bg-white p-8 text-center">
        <div className="bg-fitlog-50 text-fitlog-600 mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
          <span className="bg-fitlog-500 inline-block h-2 w-2 rounded-full" />
          404 Not Found
        </div>

        <h1 className="text-2xl font-bold text-gray-900">페이지를 찾을 수 없어요</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          주소가 잘못됐거나, 페이지가 이동/삭제됐을 수 있어요.
          <br />
          아래 버튼으로 메인으로 돌아가 주세요.
        </p>

        <div className="mt-4 flex justify-center">
          <ActionButton className="shadow-fitlog-btn-sm rounded-xl px-6 py-2">
            <Link href="/">메인으로 가기</Link>
          </ActionButton>
        </div>

        <div className="mt-5 text-xs text-gray-400">
          계속 문제가 있으면 새로고침 후 다시 시도해 주세요.
        </div>
      </div>
    </main>
  );
}
