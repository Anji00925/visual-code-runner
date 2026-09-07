package com.cybosocks;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class ProgramRunner {

    private final Turtle turtle;

    public ProgramRunner(Turtle turtle) {
        this.turtle = turtle;
    }

    public void run(JsonArray instructions) {
        for (JsonElement element : instructions) {
            if (!element.isJsonObject()) {
                throw new IllegalArgumentException("invalid block");
            }

            JsonObject block = element.getAsJsonObject();

            if (!block.has("type") || !block.get("type").isJsonPrimitive()) {
                throw new IllegalArgumentException("missing block type");
            }

            String type = block.get("type").getAsString();

            switch (type) {
                case "move" -> runMove(block);
                case "turn" -> runTurn(block);
                case "say" -> runSay(block);
                case "repeat" -> runRepeat(block);
                default -> throw new IllegalArgumentException(
                        "unknown block type: " + type
                );
            }
        }
    }

    private void runMove(JsonObject block) {
        if (!block.has("steps")) {
            throw new IllegalArgumentException("missing move steps");
        }

        int steps = getInteger(block, "steps");

        if (steps < 0) {
            throw new IllegalArgumentException("move steps cannot be negative");
        }

        turtle.move(steps);
    }

    private void runTurn(JsonObject block) {
        if (!block.has("direction")) {
            throw new IllegalArgumentException("missing turn direction");
        }

        String direction = block.get("direction").getAsString();

        if (!direction.equals("left") && !direction.equals("right")) {
            throw new IllegalArgumentException("invalid turn direction");
        }

        turtle.turn(direction);
    }

    private void runSay(JsonObject block) {
        if (!block.has("text")) {
            throw new IllegalArgumentException("missing say text");
        }

        System.out.println(block.get("text").getAsString());
    }

    private void runRepeat(JsonObject block) {
        if (!block.has("times")) {
            throw new IllegalArgumentException("missing repeat times");
        }

        if (!block.has("body") || !block.get("body").isJsonArray()) {
            throw new IllegalArgumentException("missing repeat body");
        }

        int times = getInteger(block, "times");

        if (times < 0) {
            throw new IllegalArgumentException(
                    "repeat times cannot be negative"
            );
        }

        JsonArray body = block.getAsJsonArray("body");

        for (int i = 0; i < times; i++) {
            run(body);
        }
    }

    private int getInteger(JsonObject block, String field) {
        if (!block.get(field).isJsonPrimitive()) {
            throw new IllegalArgumentException(
                    "invalid " + field
            );
        }

        try {
            return block.get(field).getAsInt();
        } catch (Exception e) {
            throw new IllegalArgumentException(
                    "invalid " + field
            );
        }
    }
}