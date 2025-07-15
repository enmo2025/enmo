import { Button } from '../ui/button';

export interface AdminSubMenuProps {
  item: {
    title: string;
    onClick: () => void;
    className?: string;
  }[];
}

export default function AdminSubMenu({ item }: AdminSubMenuProps) {
  return (
    <div className="shadow-sub-menu flex w-fit flex-col gap-1 rounded border border-yellow-400 p-2 text-yellow-300">
      {item.map((item, index) => (
        <Button
          key={index}
          onClick={item.onClick}
          size="sm"
          variant="ghost"
          typeStyle="round"
          className={`w-[92px] !text-body-xs ${item.className}`}
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
}
