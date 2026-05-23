import React from "react";
import { Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function AdminListTable(props) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr className="bg-gray-50">
            {props.headers.map((header, index) => (
              <Table.Th
                key={index}
                className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-3"
              >
                {header}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {props.items.map((item, index) => (
            <Table.Tr key={index}>
              <Table.Td>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    onClick={() => props.delete_item(item.id)}
                    title="Delete"
                  >
                    <IconTrash size={15} />
                  </button>
                  <button
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    onClick={() =>
                      props.edit_item(
                        item.id,
                        item.name,
                        item.description,
                        item.price
                      )
                    }
                    title="Edit"
                  >
                    <IconEdit size={15} />
                  </button>
                </div>
              </Table.Td>
              <Table.Td className="text-xs text-gray-400 font-mono">
                {item.id}
              </Table.Td>
              <Table.Td>
                <img
                  src={item.image}
                  width={48}
                  height={48}
                  className="rounded-lg object-cover border border-gray-100 bg-gray-50"
                  alt={item.name}
                />
              </Table.Td>
              <Table.Td className="font-medium text-gray-900 text-sm">
                {item.name}
              </Table.Td>
              <Table.Td className="text-sm text-gray-500 max-w-xs">
                <span className="line-clamp-2">{item.description}</span>
              </Table.Td>
              <Table.Td className="font-semibold text-gray-900 text-sm">
                $ {item.price}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
