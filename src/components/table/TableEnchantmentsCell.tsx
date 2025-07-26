import isNil from "lodash/isNil";

interface TableEnchantmentsCellProps {
  enchantments: string[];
}

/**
 * Table cell for displaying item enchantments.
 * @param props
 * @returns
 */
const TableEnchantmentsCell = (props: TableEnchantmentsCellProps) => {
  const { enchantments } = props;

  if (isNil(enchantments) || enchantments.length === 0) {
    return <span className="text-gray-500 dark:text-gray-400 text-sm">無</span>;
  }
  return (
    <div className="space-y-1">
      {enchantments.map((enchantment, index) => (
        <div
          key={index}
          className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs px-2 py-1 rounded-full mr-1"
        >
          {enchantment}
        </div>
      ))}
    </div>
  );
};

export default TableEnchantmentsCell;
