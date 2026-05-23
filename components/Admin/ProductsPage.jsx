import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader,
  Dialog,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getCookie } from "cookies-next";
import { IconPlus } from "@tabler/icons-react";
import AdminListTable from "./AdminListTable";
import { endPoints, getEndpoint } from "../../lib/pages";

export default function ProductsPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [productAdded, setProductAdded] = useState(false);
  const [editItemMenu, setEditItemMenu] = useState(false);

  var product = { name: "", description: "", price: "", image: "" };

  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    async function getItems() {
      setIsLoading(true);
      var result = await axios.post(getEndpoint(endPoints.getItemwd), {});
      if (result.data.success) {
        setItems(result.data.items);
      }
      setIsLoading(false);
    }
    getItems();
  }, [productAdded]);

  const add_item = async (event) => {
    event.preventDefault();
    setEditItemMenu(false);
    if (isLoading) return;
    let token = getCookie("auth");
    setIsLoading(true);
    var result = await axios.post(getEndpoint(endPoints.addItem), {
      token,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    if (result.data.success) {
      close();
      setProductAdded(!productAdded);
    }
    setIsLoading(false);
  };

  const delete_item = async (id) => {
    if (isLoading) return;
    setIsLoading(true);
    let token = getCookie("auth");
    var result = await axios.post(getEndpoint(endPoints.delItem), { token, id });
    if (result.data.success) {
      close();
      setProductAdded(!productAdded);
    }
    setIsLoading(false);
  };

  const edit_item = (id, name, description, price, image) => {
    close();
    setEditProduct({ id, name, description, price, image });
    setEditItemMenu(true);
  };

  const edit_item_sendrq = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    let token = getCookie("auth");
    var result = await axios.post(getEndpoint(endPoints.editItem), {
      token,
      id: editProduct.id,
      name: editProduct.name,
      description: editProduct.description,
      price: editProduct.price,
      image: editProduct.image,
    });
    if (result.data.success) {
      setEditItemMenu(false);
      setProductAdded(!productAdded);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col p-6 gap-5">
      {/* Loading indicator */}
      <Dialog position={{ bottom: 20, left: 20 }} opened={isLoading}>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Loader size="xs" color="dark" />
          <span>Loading…</span>
        </div>
      </Dialog>

      {/* Add item dialog */}
      <Dialog
        position={{ bottom: 20, right: 20 }}
        opened={opened}
        withCloseButton
        onClose={close}
        size="sm"
      >
        <form className="flex flex-col gap-3" onSubmit={add_item}>
          <h2 className="text-sm font-semibold text-gray-900">Add new item</h2>
          <TextInput
            size="xs"
            label="Name"
            onChange={(e) => { product.name = e.currentTarget.value; }}
          />
          <Textarea
            size="xs"
            label="Description"
            onChange={(e) => { product.description = e.currentTarget.value; }}
          />
          <TextInput
            size="xs"
            label="Price"
            placeholder="e.g. 1200"
            onChange={(e) => { product.price = e.currentTarget.value; }}
          />
          <TextInput
            size="xs"
            label="Image URL"
            onChange={(e) => { product.image = e.currentTarget.value; }}
          />
          <Button color="dark" size="xs" type="submit" fullWidth>
            {isLoading ? <Loader color="white" size="xs" /> : "Add Item"}
          </Button>
        </form>
      </Dialog>

      {/* Edit item dialog */}
      <Dialog
        position={{ bottom: 20, right: 20 }}
        opened={editItemMenu}
        withCloseButton
        onClose={() => setEditItemMenu(false)}
        size="sm"
      >
        <form className="flex flex-col gap-3" onSubmit={edit_item_sendrq}>
          <h2 className="text-sm font-semibold text-gray-900">Edit item</h2>
          <TextInput
            size="xs"
            label="Name"
            placeholder={editProduct.name}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.currentTarget.value })
            }
          />
          <Textarea
            size="xs"
            label="Description"
            placeholder={editProduct.description}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.currentTarget.value })
            }
          />
          <TextInput
            size="xs"
            label="Price"
            placeholder={editProduct.price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.currentTarget.value })
            }
          />
          <TextInput
            size="xs"
            label="Image URL"
            placeholder={editProduct.image}
            onChange={(e) =>
              setEditProduct({ ...editProduct, image: e.currentTarget.value })
            }
          />
          <Button color="dark" size="xs" type="submit" fullWidth>
            {isLoading ? <Loader color="white" size="xs" /> : "Save Changes"}
          </Button>
        </form>
      </Dialog>

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Listed Items</h1>
          <p className="text-sm text-gray-500 mt-0.5">{items.length} products</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          onClick={toggle}
        >
          <IconPlus size={16} />
          Add Item
        </button>
      </div>

      <AdminListTable
        items={items}
        headers={["", "ID", "Image", "Name", "Description", "Price"]}
        delete_item={delete_item}
        edit_item={edit_item}
      />
    </div>
  );
}
