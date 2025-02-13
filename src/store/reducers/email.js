import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const apiBase = "/api/email";

// Email operations
export const readMailBox = createAsyncThunk(
    "email/readMailBox",
    async (
        { box = "INBOX", page = 1, limit = 20, signal },
        { rejectWithValue }
    ) => {
        try {
            if (!box) {
                throw new Error("No box selected");
            }

            const response = await fetch(
                `/api/email/readmailbox/${box}?limit=${limit}&page=${page}`,
                { signal, credentials: "include" } // Pass the abort signal to fetch
            );

            const data = await response.json();
            if (!data.success || data.error) {
                throw new Error(data.error);
            }

            return {
                box,
                emails: data.emails,
                total: data.total,
                newMessages: data.newMessages,
                unseenMessages: data.unseenMessages,
            };
        } catch (err) {
            // Check if the error is due to request abortion
            if (err.name === "AbortError") {
                return rejectWithValue("Request cancelled");
            }
            return rejectWithValue(err.message);
        }
    }
);
export const readEmail = createAsyncThunk(
    "email/readEmail",
    async ({ box, uid }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/email/readmail/${box}/${uid}`, {
                credentials: "include",
            });
            const data = await response.json();
            if (!data.success || data.error) {
                return rejectWithValue(data.error || "Failed to read email");
            }
            return data.email;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
export const moveEmail = createAsyncThunk(
    "email/moveEmail",
    async ({ uid, sourceFolder, destinationFolder }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/email/moveemail`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sourceFolder, destinationFolder, uid }),
            });
            const data = await response.json();
            if (!data.success || data.error) {
                return rejectWithValue(data.error || "Failed to move email");
            }
            return {
                uid,
                sourceFolder,
                destinationFolder,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const addFlag = createAsyncThunk(
    "email/addFlag",
    async ({ box, uid, flag }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/email/addflag/${box}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ flag, uid }),
            });
            const data = await response.json();
            if (!data.success || data.error) {
                return rejectWithValue(data.error || "Failed to add flag");
            }
            return {
                uid,
                box,
                flag,
            };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
export const deleteEmail = createAsyncThunk(
    "email/delete",
    async ({ box, uid }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/email/delete/${box}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uid }),
            });
            const data = await response.json();
            if (!data.success || data.error) {
                return rejectWithValue(data.error || "Couldn't delete the message");
            }
            return { box, uid };
        } catch (err) {
            rejectWithValue(err.message);
        }
    }
);
// Boxes
export const getBoxs = createAsyncThunk(
    "email/getBoxs",
    async (args, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/email/getboxes", {
                credentials: "include",
            });
            const data = await response.json();
            if (!data.success || data.error) {
                throw new Error(data.error);
            }
            return data.boxes;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
export const newBox = createAsyncThunk(
    "email/newBox",
    async (args, { rejectWithValue }) => {
        try {
            const folderName =
                args.charAt(0).toUpperCase() + args.slice(1).toLowerCase();
            const response = await fetch(`/api/email/newbox/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: `INBOX.${folderName}` }),
            });
            const data = await response.json();
            if (!data.success || data.error) {
                return rejectWithValue(data.error || "Failed to create folder");
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
export const deleteBox = createAsyncThunk(
    "email/deleteBox",
    async (args, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/email/deletebox/${args}`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await response.json();
            if (!data.success || data.error) {
                return rejectWithValue(data.error || "Failed to delete folder");
            }
            return args;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
export const resetPassword = createAsyncThunk(
    "email/resetPassword",
    async (args, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/email/resetpassword`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: args.password }),
            });
            const data = await response.json();
            if (!response.ok || !data.success || data.error) {
                return rejectWithValue(data.error || "Failed to delete folder");
            }
            return args;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
const emailSlice = createSlice({
    name: "email",
    initialState: {
        boxes: [],
        box: "INBOX",
        emails: [],
        total: 0,
        newMessages: 0,
        unseenMessages: 0,
        loading: false,
        error: null,
        allEmails: [],
        resetPassword: false,
    },
    reducers: {
        setBox: (state, action) => {
            state.box = action.payload;
        },
        setEmails: (state, action) => {
            state.emails = action.payload;
        },
        reset:(state , action) => {
            state.box = "INBOX";
            state.emails = [];
            state.total = 0;
            state.newMessages = 0;
            state.unseenMessages = 0;
            state.loading = false;
            state.error = null;
            state.allEmails = [];
            state.resetPassword = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(readMailBox.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(readMailBox.fulfilled, (state, action) => {
                state.loading = false;
                state.box = action.payload.box;
                state.emails = action.payload.emails;
                state.allEmails = action.payload.emails;
                state.total = action.payload.total;
                state.newMessages = action.payload.newMessages;
                state.unseenMessages = action.payload.unseenMessages;
            })
            .addCase(readMailBox.rejected, (state, action) => {
                state.loading = false;
                // Don't set error state for cancelled requests
                if (action.payload !== "Request cancelled") {
                    state.error = action.payload;
                }
            })
            .addCase(moveEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(moveEmail.fulfilled, (state, action) => {
                state.loading = false;
                const { uid, sourceFolder, destinationFolder } = action.payload;
                state.emails = state.emails.filter((email) =>
                    Array.isArray(uid) ? !uid.includes(email.uid) : email.uid !== uid
                );
                state.allEmails = state.emails.filter((email) =>
                    Array.isArray(uid) ? !uid.includes(email.uid) : email.uid !== uid
                );
            })
            .addCase(moveEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addFlag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFlag.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const { uid, box, flag } = action.payload;

                const handleAddFlag = (id) => {
                    const email = state.boxes[box].emails.find(
                        (email) => email.uid == id
                    );
                    if (email) {
                        if (!email.flags) {
                            email.flags = [flag];
                        } else if (!email.flags.includes(flag)) {
                            email.flags.push(flag);
                            if (flag == "\\Seen") {
                                email.seen = true;
                            }
                        }
                    }
                };
                if (Array.isArray(uid)) {
                    // Handle multiple emails
                    uid.forEach((id) => {
                        handleAddFlag(id);
                    });
                } else {
                    handleAddFlag(uid);
                }
            })
            .addCase(addFlag.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteEmail.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteEmail.fulfilled, (state, action) => {
                state.loading = false;
                const { uid } = action.payload;
                state.emails = state.emails.filter((email) =>
                    Array.isArray(uid) ? !uid.includes(email.uid) : email.uid !== uid
                );
                state.allEmails = state.emails.filter((email) =>
                    Array.isArray(uid) ? !uid.includes(email.uid) : email.uid !== uid
                );
            })
            .addCase(getBoxs.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBoxs.fulfilled, (state, action) => {
                state.loading = false;
                state.boxes = action.payload;
            })
            .addCase(getBoxs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(newBox.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(newBox.fulfilled, (state, action) => {
                state.loading = false;
                state.boxes.push(action.payload.name);
            })
            .addCase(newBox.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBox.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBox.fulfilled, (state, action) => {
                state.loading = false;
                state.box = "INBOX";
                const deletedBox = action.payload;
                state.boxes = state.boxes.filter((box) => box !== deletedBox);
            })
            .addCase(deleteBox.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.resetPassword = true;
                state.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setBox, removeEmail, setEmails, reset } = emailSlice.actions;
export default emailSlice.reducer;
