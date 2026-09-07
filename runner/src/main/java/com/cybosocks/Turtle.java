package com.cybosocks;

public class Turtle {

    private int x = 0;
    private int y = 0;

    private Direction direction = Direction.NORTH;

    enum Direction {
        NORTH,
        EAST,
        SOUTH,
        WEST
    }

    public void move(int steps) {
        switch (direction) {
            case NORTH -> y += steps;
            case EAST -> x += steps;
            case SOUTH -> y -= steps;
            case WEST -> x -= steps;
        }
    }

    public void turn(String turnDirection) {
        if (turnDirection.equals("right")) {
            direction = switch (direction) {
                case NORTH -> Direction.EAST;
                case EAST -> Direction.SOUTH;
                case SOUTH -> Direction.WEST;
                case WEST -> Direction.NORTH;
            };
        } else if (turnDirection.equals("left")) {
            direction = switch (direction) {
                case NORTH -> Direction.WEST;
                case WEST -> Direction.SOUTH;
                case SOUTH -> Direction.EAST;
                case EAST -> Direction.NORTH;
            };
        }
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public Direction getDirection() {
        return direction;
    }
}