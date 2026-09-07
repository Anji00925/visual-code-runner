package com.cybosocks;

import java.nio.file.Files;
import java.nio.file.Path;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class Main {

    public static void main(String[] args) {

        if (args.length != 1) {
            System.out.println("ERROR: usage: java -jar runner.jar program.json");
            return;
        }

        try {
            String json = Files.readString(Path.of(args[0]));

            JsonObject program =
                    JsonParser.parseString(json).getAsJsonObject();

            if (!program.has("program")
                    || !program.get("program").isJsonArray()) {
                throw new IllegalArgumentException("missing program array");
            }

            Turtle turtle = new Turtle();
            ProgramRunner runner = new ProgramRunner(turtle);

            runner.run(program.getAsJsonArray("program"));

            System.out.println(
                    "Final position: (" +
                    turtle.getX() + "," +
                    turtle.getY() +
                    ") facing " +
                    turtle.getDirection()
            );

        } catch (Exception e) {
    System.out.println("ERROR: malformed JSON or invalid program");
}
    }
}